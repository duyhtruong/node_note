const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
	const notes = loadNotes()
	const duplicateNote = notes.find((note)=> note.title === title)

	if(!duplicateNote){
		notes.push({
			title: title,
			body: body
		})
	
		saveNotes(notes)
		console.log(chalk.bgGreen('New note added!'))
	}else{
		console.log(chalk.bgRed('Note title taken'))
	}


}

const removeNote = (title) => {
	const notes = loadNotes()
	const keepNotes = notes.filter((note) => note.title !== title)

	if (notes.length > keepNotes.length){
		saveNotes(keepNotes)
		console.log(chalk.bgGreen('Note removed!'))
	}else{
		console.log(chalk.bgRed('No note found!'))
	}
}

const listNotes = () => {
	const notes = loadNotes()
	notes.forEach((note)=> console.log(note.title))
}

const readNote = (title) => {
	const notes = loadNotes()
	const read = notes.find((note)=> note.title === title)
	if(read){
		console.log(chalk.red(read.title))
		console.log(read.body)
	} else {
		console.log(chalk.red('error'))

	}
}



const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
	try{
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch(e){
		return []
	}
	

}


module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
}