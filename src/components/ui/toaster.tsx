'use client'

import { useToast } from '@/hooks/use-toast'
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from '@/components/ui/toast'
import Image from 'next/image'
import Link from 'next/link'
import { Url } from 'url'

export function Toaster() {
    const { toasts } = useToast()

    return (
        <ToastProvider>
            {toasts.map(function ({
                id,
                title,
                avatar,
                created_at,
                url,
                repo,
                language,
                commit_message,
                pull_request_title,
                pull_request_url,
                sender,
                description,
                action,
                ...props
            }) {
                return (
                    <Toast key={id} {...props} className="mb-4 bg-black">
                        <div className="flex gap-5 min-w-40 p-2">
                            {avatar && (
                                <div>
                                    <Image
                                        alt=""
                                        sizes="50vw"
                                        src={avatar}
                                        width={50}
                                        height={50}
                                        style={{
                                            borderRadius: '100%',
                                        }}
                                    />
                                </div>
                            )}
                            <div className="flex flex-col gap-1">
                                {title && <ToastTitle>{title}</ToastTitle>}
                                {sender && (
                                    <p className="text-xs">
                                        Author: <b>{sender} </b>
                                    </p>
                                )}
                                {description && (
                                    <ToastDescription>
                                        Action type: <b>{description} </b>
                                    </ToastDescription>
                                )}
                                {commit_message && (
                                    <p className="text-xs overflow-ellipsis">
                                        Commit message: <b>{commit_message}</b>
                                    </p>
                                )}
                                {pull_request_title && (
                                    <p className="text-xs">
                                        Pull request title:
                                        <Link
                                            className="hover:underline text-ellipsis"
                                            href={
                                                pull_request_url as unknown as Url
                                            }
                                        >
                                            <b>{pull_request_title}</b>{' '}
                                        </Link>
                                    </p>
                                )}
                                {created_at && (
                                    <p className="text-xs">
                                        Created at:{' '}
                                        {new Date(
                                            created_at
                                        ).toLocaleDateString('en-GB', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                    </p>
                                )}
                                {repo && (
                                    <p className="text-xs">
                                        Project:{' '}
                                        <Link
                                            className="hover:underline"
                                            href={url as unknown as Url}
                                        >
                                            {' '}
                                            <b>{repo}</b>
                                        </Link>
                                    </p>
                                )}
                                {language && (
                                    <p className="text-xs">
                                        {' '}
                                        <i
                                            style={{ fontSize: '20px' }}
                                            className={`devicon-${language.toLowerCase()}-plain`}
                                        ></i>
                                    </p>
                                )}

                                {action}
                            </div>
                        </div>

                        <ToastClose />
                    </Toast>
                )
            })}
            <ToastViewport />
        </ToastProvider>
    )
}
