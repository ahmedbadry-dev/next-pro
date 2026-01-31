import { Navbar } from "@/components/web/navbar"

const SharedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}

export default SharedLayout