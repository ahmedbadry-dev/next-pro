'use client'
import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { ModeToggle } from "../ui/theme-toggle-icon"
import { useConvexAuth } from "convex/react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    return (
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href={'/'}>
                    <h1 className="text-3xl font-bold">
                        Next<span className="text-blue-500">Pro</span>
                    </h1>
                </Link>

                <div className="flex items-center gap-2">
                    <Link className={buttonVariants({ variant: "ghost" })} href={'/'}>Home</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href={'/blogs'}>Blogs</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href={'/create'}>Create</Link>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {
                    isLoading ?
                        null
                        : isAuthenticated ?
                            (
                                <Button
                                    onClick={() => authClient.signOut({
                                        fetchOptions: {
                                            onSuccess: () => {
                                                toast.success("Logged out successfully")
                                            },
                                            onError: (res) => {
                                                toast.error(res.error.message)
                                            }
                                        }
                                    })}
                                    className={buttonVariants({ variant: "default" })}
                                >Logout</Button>
                            ) : (
                                <>
                                    <Link className={buttonVariants()} href={'/auth/sign-up'}>Sign up</Link>
                                    <Link className={buttonVariants({ variant: "outline" })} href={'/auth/login'}>Login</Link>
                                </>
                            )
                }
                <ModeToggle />
            </div>
        </nav>
    )
}
