import supabase from '@/app/utils/supabase'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request, response: Response) {
    const githubEvent = request.headers.get('x-github-event')
    let payload = null

    if (githubEvent !== null) {
        payload = await request.json()
        const { data, error } = await supabase
            .from('github_notifications')
            .insert([
                {
                    id: uuidv4(),
                    event: githubEvent,
                    sender: payload.sender.login,
                    repo: payload.repository.name,
                    description: payload.repository.description,
                    avatar: payload.sender.avatar_url,
                    url: payload.repository.html_url,
                    language: payload.repository.language,
                    pushed_at: new Date(payload.repository.pushed_at),
                    pull_request_url:
                        payload.pull_request && payload.pull_request.html_url,
                    pull_request_title:
                        payload.pull_request && payload.pull_request.title,
                    commit_message:
                        payload.commits && payload.commits[0].message,
                },
            ])
            .select()
    }

    return new Response('test', {
        status: 200,
    })
}
