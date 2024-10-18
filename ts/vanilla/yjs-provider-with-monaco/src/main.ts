import * as monaco from 'monaco-editor'
import './style.css'
import * as Y from 'yjs'
import { sampleInfo } from './projectInfo'
import { SuperVizYjsProvider } from '@superviz/yjs'
import SuperVizRoom from '@superviz/sdk'
import { VITE_DEVELOPER_KEY } from '../env'
import { MonacoBinding } from 'y-monaco'

const groupId = sampleInfo.id
const groupName = sampleInfo.name
const participant = Math.floor(Math.random() * 100)
	.toString()
	.padStart(3, '0')

const doc = new Y.Doc()
const provider = new SuperVizYjsProvider(doc)

async function initializeRoom() {
	const room = await SuperVizRoom(VITE_DEVELOPER_KEY, {
		group: {
			id: groupId,
			name: groupName,
		},
		participant: {
			id: participant,
			name: 'John ' + participant,
		},
		roomId: groupId,
		environment: 'dev',
	})

	room.addComponent(provider)
}

initializeRoom()

const content = `function helloWorld() {
    console.log("Hello, World!");
}`

const language = 'TypeScript'
const fontSize = 14
const fontFamily = 'Consolas'
const theme = 'vs-dark'
const editorContainerId = 'editorContainer'

const editorContainer = document.getElementById(editorContainerId)!

editorContainer.style.height = '100vh'
editorContainer.style.width = '100%'

const editor = monaco.editor.create(editorContainer, {
	value: content,
	language: language,
	glyphMargin: false,
	automaticLayout: true,
	renderWhitespace: 'all',
	scrollBeyondLastLine: false,
	fontSize: fontSize,
	fontFamily: fontFamily,
	theme: theme,
})

const monacoBinding = new MonacoBinding(doc.getText(), editor.getModel()!, new Set([editor]), provider.awareness)
