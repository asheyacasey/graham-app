import PusherClient from 'pusher-js'

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string, {
    cluster: process.env.NEXT_PUBLIC_APP_CLUSTER as string
})
