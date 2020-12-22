import {
  getRequest,
  // IProject,
  ILoginRequest,
  postRequest, IRegisterRequest, ILoginResponse,
} from './helpers'

export default class API {
  private static endpoint = 'http://localhost:5000/api'

  public static async loadAllProjects() {
    return await getRequest(`${this.endpoint}/projects`, true)
  }

  // public static async loadProjects(from: number, to: number) {

  // }

  // public static async createProjectAndTranscribe(project: IProject) {

  // }

  public static async login(credentials: ILoginRequest): Promise<ILoginResponse> {
    return await postRequest(`${this.endpoint}/auth/login`, false, credentials)
  }

  public static async register(credentials: IRegisterRequest) {
    return await postRequest(`${this.endpoint}/auth/register`, false, credentials)
  }
}
