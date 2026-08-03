import { AdminTabs } from "./AdminTabs"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <AdminTabs />
            {children}
        </main>
    )
}
