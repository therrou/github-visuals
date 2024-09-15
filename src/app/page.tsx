import { Toaster } from '@/components/ui/toaster'
import { NotificationToast } from './components/notification'
import supabase from './utils/supabase'

export default async function Home() {
    const { data } = await supabase
        .from('github_notifications')
        .select('*')
        .limit(5)

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen   font-[family-name:var(--font-geist-sans)]">
            <NotificationToast data={data ?? []} />
            <Toaster />
        </div>
    )
}
