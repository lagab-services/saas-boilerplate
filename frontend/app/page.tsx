import {Metadata} from 'next';

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="px-3 py-36">
                <div className="mx-auto max-w-screen-lg">
                    <div className="mt-3 whitespace-pre-line text-center text-5xl font-bold tracking-tight">Kickstart your project effortlessly with
                        the Free and Open-Source<span
                            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Next.js Boilerplate</span>
                    </div>
                    <div className="mx-auto mt-5 max-w-screen-md text-center text-xl text-muted-foreground">Jumpstart your project in seconds, bundled
                        with built-in Authentication, Dashboard, I18n, Forms, SEO and more!
                    </div>
                    <div className="mt-8 flex justify-center gap-x-5 gap-y-3 max-sm:flex-col"><a
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8"
                        href="/dashboard">Get Started</a></div>
                </div>
            </div>


        </main>
    );
}
