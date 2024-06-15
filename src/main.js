import './style.css'
import SuperVizRoom, { FormElements } from '@superviz/sdk'
import { sampleInfo } from './projectInfo'

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY
const participant = Math.floor(Math.random() * 100)
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
			id: participant.toString(),
			name: 'John ' + participant,
		},
	})

	const formElements = new FormElements({
		fields: ['name', 'email', 'dog', 'cat', 'fish'],
	})

	room.addComponent(formElements)

	return room
}

initializeSuperVizRoom()
