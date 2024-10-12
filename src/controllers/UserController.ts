import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

export class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    const users = await userService.getAllUsers();
    return res.json(users);
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;
    const user = await userService.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;
    const existingUser = await userService.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    await userService.createUser({ username, password });
    return res.status(201).json({ message: 'User created' });
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;
    const user = await userService.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await userService.deleteUser(username);
    return res.json({ message: 'User deleted' });
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
      const isAuthenticated = await userService.authenticate(username, password);

      if (isAuthenticated) {
        res.status(200).json({ message: 'Login exitoso' });
      } else {
        res.status(401).json({ message: 'Error en la autenticación' });
      }
    } catch (error) {
      console.error('Error en el login:', error);
      res.status(500).json({ message: 'Error en la conexión al servidor' });
    }
  }
}
