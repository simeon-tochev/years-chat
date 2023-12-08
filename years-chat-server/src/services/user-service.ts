class UserService {
  existingUsers: string[] = []

  loginUser (username: string): void {
    if (!this.userExists(username)) {
      this.registerUser(username)
    }
  }

  findUser (username: string): string | undefined {
    return this.existingUsers.find(u => u === username)
  }

  userExists (username: string): boolean {
    return !!this.findUser(username)
  }

  private registerUser (username: string): void {
    this.existingUsers = [
      ...this.existingUsers,
      username
    ]
  }
}

export const userService = new UserService()
