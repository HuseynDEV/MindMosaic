export type storeType = {
    user: {
        name: string | null,
        email: string | null
    },
    loading: boolean,
    error: boolean
}

export type UserType = {
    email: string,
    password: string,
    username: string,
    navigate?: (path: string) => void
}

export type accountTypeID = {
    accessToken: string,
    user: {
        displayName: string,
        email: string
    }
} 