import { promises as fs } from 'fs';
import { UserModel } from '../models/UserModel';
import * as path from 'path';

const filePath = path.join(__dirname, '../data/users.json');
const directoryPath = path.dirname(filePath);

export class UserService {
  private async readUsers(): Promise<UserModel[]> {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Si no existe el archivo, devolver una lista vacía
      return [];
    }
  }

  private async ensureDirectoryExists(): Promise<void> {
    try {
      await fs.access(directoryPath);
    } catch (error) {
      // Si el directorio no existe, crearlo
      await fs.mkdir(directoryPath, { recursive: true });
    }
  }

  private async writeUsers(users: UserModel[]): Promise<void> {
    await this.ensureDirectoryExists();  // Asegurarse de que el directorio existe
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
  }

  public async getAllUsers(): Promise<UserModel[]> {
    return await this.readUsers();
  }

  public async getUserByUsername(username: string): Promise<UserModel | undefined> {
    const users = await this.readUsers();
    return users.find(user => user.username === username);
  }

  public async createUser(user: UserModel): Promise<void> {
    const users = await this.readUsers();
    users.push(user);
    await this.writeUsers(users);
  }

  public async deleteUser(username: string): Promise<void> {
    let users = await this.readUsers();
    users = users.filter(user => user.username !== username);
    await this.writeUsers(users);
  }

  public async authenticate(username: string, password: string): Promise<boolean> {
    const user = await this.getUserByUsername(username);
    return user !== undefined && user.password === password;
  }
}
