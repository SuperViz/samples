import Quill from 'quill'
import { sampleInfo } from './projectInfo'
import './style.css'
import SuperVizRoom from '@superviz/sdk'
import { SuperVizYjsProvider } from '@superviz/yjs'
import * as Y from 'yjs'
import 'quill/dist/quill.snow.css'
import QuillCursors from 'quill-cursors'
import { QuillBinding } from 'y-quill'

Quill.register('modules/cursors', QuillCursors)

const doc = new Y.Doc()

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY
const participant = Math.floor(Math.random() * 100)
	.toString()
	.padStart(3, '0')
const groupId = sampleInfo.id
const groupName = sampleInfo.name

async function initializeSuperVizRoom() {
	const room = await SuperVizRoom(DEVELOPER_KEY, {
		roomId: groupId,
		group: {
			id: groupId,
			name: groupName,
		},
		participant: {
			id: participant,
			name: 'John ' + participant,
		},
		environment: 'dev',
	})

	const provider = new SuperVizYjsProvider(doc)
	room.addComponent(provider)

	const quill = new Quill('#editor', {
		theme: 'snow',
	})

	const binding = new QuillBinding(doc.getText('quill'), quill, provider.awareness)

	return room
}

initializeSuperVizRoom()
