// Note: Simpler helper class to manage questions

let csvToJson = require('convert-csv-to-json')

try {
    console.log('Converting Question Banks...')
    console.log(`Working Directory: ${process.cwd()}`)

    let fileInputName = './questions/banks/external_validity_questions.csv'
    let fileOutputName =
        './questions/generated/external_validity_questions.json'

    console.log(`Converting ${fileInputName} to ${fileOutputName}`)
    csvToJson
        .fieldDelimiter(',')
        .utf8Encoding()
        .supportQuotedField(true)
        .generateJsonFileFromCsv(fileInputName, fileOutputName)

    fileInputName = './questions/banks/internal_validity_questions.csv'
    fileOutputName = './questions/generated/internal_validity_questions.json'

    console.log(`Converting ${fileInputName} to ${fileOutputName}`)
    csvToJson
        .fieldDelimiter(',')
        .utf8Encoding()
        .supportQuotedField(true)
        .generateJsonFileFromCsv(fileInputName, fileOutputName)

    fileInputName = './questions/banks/outcomes_questions.csv'
    fileOutputName = './questions/generated/outcomes_questions.json'

    console.log(`Converting ${fileInputName} to ${fileOutputName}`)
    csvToJson
        .fieldDelimiter(',')
        .utf8Encoding()
        .supportQuotedField(true)
        .generateJsonFileFromCsv(fileInputName, fileOutputName)

    fileInputName = './questions/banks/reporting_questions.csv'
    fileOutputName = './questions/generated/reporting_questions.json'

    console.log(`Converting ${fileInputName} to ${fileOutputName}`)
    csvToJson
        .fieldDelimiter(',')
        .utf8Encoding()
        .supportQuotedField(true)
        .generateJsonFileFromCsv(fileInputName, fileOutputName)

    fileInputName = './questions/banks/planning_questions.csv'
    fileOutputName = './questions/generated/planning_questions.json'

    console.log(`Converting ${fileInputName} to ${fileOutputName}`)
    csvToJson
        .fieldDelimiter(',')
        .utf8Encoding()
        .supportQuotedField(true)
        .generateJsonFileFromCsv(fileInputName, fileOutputName)
} catch (error) {
    console.log('Error converting external validity questions: ', error)
}
