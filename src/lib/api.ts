import { SavedGlobalStateType } from '@/questions/types/GlobalStateType'
import fs from 'fs'
import path from 'path'

const localArchiveDirectory = path.join(process.cwd(), 'archives')

function getArchivedFiles() {
    return fs.readdirSync(localArchiveDirectory)
}

export async function getFileByID(file_name: string) {
    const id_string = file_name.replace(/\.json$/, '')
    const full_path = path.join(localArchiveDirectory, `${id_string}.json`)

    if (!fs.existsSync(full_path)) {
        return undefined
    }

    const file_contents = await fs.promises.readFile(full_path, 'utf8')

    const archived_info: SavedGlobalStateType = JSON.parse(file_contents)

    return archived_info
}

export async function getAllArchivedFiles() {
    const saved_files = await Promise.all(
        getArchivedFiles().map((id) => getFileByID(id))
    )

    const filtered_files = saved_files.filter(
        (file) => file !== undefined
    ) as SavedGlobalStateType[]

    return filtered_files
}
