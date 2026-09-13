import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        return response;
    }

    // Sinkronisasi sesi autentikasi Supabase via cookies
    const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                response = NextResponse.next({
                    request,
                });
                cookiesToSet.forEach(({ name, value, options }) =>
                    response.cookies.set(name, value, options)
                );
            },
        },
    });

    // Ambil data user aktif secara aman dari token
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;

    const isProtectedPath =
        pathname.startsWith('/guru') ||
        pathname.startsWith('/siswa');

    // 1. Jika belum login dan mencoba masuk ke rute guru / siswa
    if (isProtectedPath && !user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Ambil role langsung dari tabel profiles jika user terautentikasi
    let userRole: string | null = null;
    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        userRole = profile?.role ?? user.user_metadata?.role ?? request.cookies.get('vokid_role')?.value ?? null;
    }

    // 2. Proteksi Peran (Role-Based Access Control)
    if (user && isProtectedPath) {
        // Bukan GURU dilarang masuk ke rute /guru
        if (pathname.startsWith('/guru') && userRole !== 'GURU') {
            return NextResponse.redirect(new URL('/siswa', request.url));
        }

        // Akun GURU diarahkan ke /guru jika mengakses /siswa
        if (pathname.startsWith('/siswa') && userRole === 'GURU') {
            return NextResponse.redirect(new URL('/guru', request.url));
        }
    }

    // 3. Redirect dari /login atau root '/' sesuai peran
    if ((pathname === '/login' || pathname === '/') && user) {
        if (userRole === 'GURU') {
            return NextResponse.redirect(new URL('/guru', request.url));
        }
        return NextResponse.redirect(new URL('/siswa', request.url));
    }

    return response;
}

export default proxy;

export const config = {
    matcher: [
        '/',
        '/login',
        '/guru/:path*',
        '/siswa/:path*',
    ],
};