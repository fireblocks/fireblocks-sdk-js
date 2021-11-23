import { IAuthProvider } from "./iauth-provider"
import { RequestOptions } from "./types"
import axios, { AxiosInstance } from "axios"

export class ApiClient {
  private axiosInstance: AxiosInstance

  constructor(private authProvider: IAuthProvider, private apiBaseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: this.apiBaseUrl,
    })
  }

  public async issueGetRequest(path: string, pageMode: boolean = false) {
    const token = this.authProvider.signJwt(path)
    const res = await this.axiosInstance.get(path, {
      headers: {
        "X-API-Key": this.authProvider.getApiKey(),
        Authorization: `Bearer ${token}`,
      },
    })

    if (pageMode) {
      return {
        transactions: res.data,
        pageDetails: {
          prevPage: res.headers["prev-page"] ? res.headers["prev-page"].toString() : "",
          nextPage: res.headers["next-page"] ? res.headers["next-page"].toString() : "",
        },
      }
    }

    return res.data
  }

  public async issuePostRequest(path: string, body: any, requestOptions?: RequestOptions) {
    const token = this.authProvider.signJwt(path, body)

    const idempotencyKey = requestOptions?.idempotencyKey

    return (
      await this.axiosInstance.post(path, body, {
        headers: {
          "X-API-Key": this.authProvider.getApiKey()
        },
      })
    ).data
  }

  public async issuePutRequest(path: string, body: any) {
    const token = this.authProvider.signJwt(path, body)

    return (
      await this.axiosInstance.put(path, body, {
        headers: {
          "X-API-Key": this.authProvider.getApiKey(),
          Authorization: `Bearer ${token}`,
        },
      })
    ).data
  }

  public async issueDeleteRequest(path: string) {
    const token = this.authProvider.signJwt(path)

    return (
      await this.axiosInstance.delete(path, {
        headers: {
          "X-API-Key": this.authProvider.getApiKey(),
          Authorization: `Bearer ${token}`,
        },
      })
    ).data
  }
}
