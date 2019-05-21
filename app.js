const chalk = require('chalk')
const note = require('./notes.js')
const yargs = require('yargs')

//customize yargs version
yargs.version('1.1.0')

//create add command
yargs.command({
	command: 'add',
	describe: 'add a new note',
	builder:{
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		body:{
			describe:'body',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv){
		note.addNote(argv.title, argv.body)
	}
})




//create remove command
yargs.command({
	command: 'remove',
	describe:'removing a note',
	builder:{
		title:{
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		note.removeNote(argv.title)
	}
})



//create list command
yargs.command({
	command: 'list',
	describe: 'listing notes',
	handler(){
		console.log(chalk.red('Your Notes'))
		note.listNotes()
	}
})


//create read command
yargs.command({
	command: 'read',
	describe: 'reading notes',
	builder: {
		title: {
			describe: 'note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv){
		note.readNote(argv.title)
	}
})


//add,remove,read,list
yargs.parse()