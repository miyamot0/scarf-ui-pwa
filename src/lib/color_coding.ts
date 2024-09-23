export const color_code = (status: string) => {
    switch (status) {
        case 'NotStarted':
            return 'bg-red-500'
        case 'InProgress':
            return 'bg-yellow-500'
        case 'Completed':
            return 'bg-green-500'
        default:
            return 'bg-gray-500'
    }
}

export const text_color_code = (status: string) => {
    switch (status) {
        case 'NotStarted':
            return 'text-red-500'
        case 'InProgress':
            return 'text-yellow-500'
        case 'Completed':
            return 'text-green-500'
        default:
            return 'text-gray-500'
    }
}
