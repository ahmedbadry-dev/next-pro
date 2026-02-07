import { Loader2, Search } from "lucide-react"
import { Input } from "../ui/input"
import { useDebugValue, useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"

export const SearchInput = () => {
    const [term, setTerm] = useState('')
    const [open, setOpen] = useState(false)

    const results = useQuery(
        api.functions.blogs.searchBlogs,
        term.length >= 2 ? {
            term: term, limit: 5
        } : 'skip')

    const handleSearchChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value)
        setOpen(true)
    }

    return (
        <div className="relative w-full max-w-sm z-10">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search blogs..."
                    className="pl-8"
                    onChange={handleSearchChanges}
                    value={term}
                    onFocus={() => term.length >= 2 && setOpen(true)}
                />
            </div>
            {
                open && term.length >= 2 && (
                    <div className="absolute w-full top-full mt-2 rounded-md border bg-popover
                        text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95"
                    >
                        {
                            results === undefined ? (
                                <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    <span>Searching...</span>
                                </div>
                            ) : results.length === 0 ? (
                                <p className="p-4 text-sm text-muted-foreground text-center">No results found!</p>
                            ) : (
                                <div className="py-1">
                                    {
                                        results.map(blog => (
                                            <Link
                                                href={`/blogs/${blog._id}`}
                                                key={blog._id}
                                                className="flex flex-col px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer "
                                                onClick={() => {
                                                    setTerm('')
                                                    setOpen(false)
                                                }}
                                            >
                                                <p className="font-medium truncate">{blog.title}</p>
                                                <p className="text-xs text-muted-foreground pt-1">{blog.content.substring(0, 60)}</p>
                                            </Link>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

