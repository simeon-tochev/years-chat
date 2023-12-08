interface Message {
  sender: string
  content: string | undefined
  sentTime: Date
  edited?: Date
  deleted?: boolean
  id?: number
}

class ChatService {
  chatLog: Message[] = [
    {
      sender: 'user1',
      content: 'this is a message',
      sentTime: new Date(),
      id: 0
    },
    {
      sender: 'user2',
      content: 'it is a message indeed',
      sentTime: new Date(),
      id: 1
    },
    {
      sender: 'user3',
      content: 'this is an edited message',
      sentTime: new Date(),
      edited: new Date(),
      id: 2
    },
    {
      sender: 'user4',
      content: 'this is a deleted message',
      sentTime: new Date(),
      deleted: true,
      id: 3
    }
  ]

  currentId = this.chatLog.length

  sendMessage (message: Message): number {
    const messageToEdit = message.id ? this.chatLog.findIndex(m => m.id === message.id) : undefined
    if (messageToEdit) {
      this.chatLog[messageToEdit] = {
        ...message
      }
      return this.chatLog[messageToEdit].id ?? -1
    } else {
      const newMessageId = this.currentId
      const messageToAdd: Message = {
        ...message,
        id: newMessageId
      }
      this.chatLog = [
        ...this.chatLog,
        messageToAdd
      ]
      this.currentId = this.currentId + 1
      return newMessageId
    }
  }

  loadAllMessages (): { messages: Message[] } {
    return {
      messages: this.chatLog
    }
  }
}

export const chatService = new ChatService()
