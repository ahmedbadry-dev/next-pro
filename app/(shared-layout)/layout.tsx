import { Navbar } from "@/components/web/Navbar"


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