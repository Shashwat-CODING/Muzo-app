"use client"

import { useState } from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export function ReleaseCard({ body }: { body: string }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="relative">
            <div className={`prose prose-invert prose-sm max-w-none ${!isExpanded ? 'max-h-[150px] overflow-hidden' : ''}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {body}
                </ReactMarkdown>
            </div>

            {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />
            )}

            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-primary hover:text-primary/80 hover:bg-transparent pl-0"
            >
                {isExpanded ? (
                    <>
                        <ChevronUp className="mr-1 h-4 w-4" />
                        Show Less
                    </>
                ) : (
                    <>
                        <ChevronDown className="mr-1 h-4 w-4" />
                        Read Full Release Notes
                    </>
                )}
            </Button>
        </div>
    )
}
