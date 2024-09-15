'use client'
import { useToast } from '@/hooks/use-toast'
import React, { useEffect } from 'react'
import supabase from '../utils/supabase'
import Swirl from './Swirl'

/* eslint-disable */

export const NotificationToast = ({ data }: any) => {
    const [notifications, setNotifications] = React.useState(data)
    const [isMounted, setIsMounted] = React.useState(false)
    const { toast } = useToast()
    React.useEffect(() => {
        const channel = supabase
            .channel('github_notifications')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    tables: 'github_notifications',
                },
                (payload) => {
                    toast({
                        avatar: payload.new.avatar,
                        title: `New GitHub Notification`,
                        repo: payload.new.repo,
                        created_at: payload.new.created_at,
                        language: payload.new.language,
                        sender: payload.new.sender,
                        url: payload.new.url,
                        description: `${payload.new.event}.`,
                        commit_message: payload.new.commit_message,
                        pull_request_title: payload.new.pull_request_title,
                        pull_request_url: payload.new.pull_request_url,
                    })
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [data, supabase])

    useEffect(() => {
        setIsMounted(true)
        setNotifications(data)
    }, [])

  

    useEffect(() => {
        if (isMounted && notifications) {
            notifications.forEach((notification: any) => {
                toast({
                    defaultOpen: true,
                    avatar: notification.avatar,
                    title: `New GitHub Notification`,
                    repo: notification.repo,
                    created_at: notification.created_at,
                    language: notification.language,
                    sender: notification.sender,
                    url: notification.url,
                    description: `${notification.event}.`,
                    commit_message: notification.commit_message,
                    pull_request_title: notification.pull_request_title,
                    pull_request_url: notification.pull_request_url,
                })
            })

        }
    }, [isMounted])

    return (
        <>
        
            <Swirl notifications={notifications} />
        </>
    )
}
