import axios from "axios";
import { serverApi } from "../../lib/config";
import { Member } from "../../lib/types/member";


class MemberService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      let url = this.path + "/member/top-users";
      const result = await axios.get(url);
      console.log("getTopUsers:", result);

      return result.data;
    } catch (err) {
      console.log("MemberService - getTopUsers error:", err);
      throw err;
    }
  }

  public async getRestaurant(): Promise<Member> {
    try {
      let url = this.path + "/member/restaurant";
      const result = await axios.get(url);
      console.log("getRestaurant:", result);

      return result.data;
    } catch (err) {
      console.log("MemberService - getRestaurant error:", err);
      throw err;
    }
  }
}

export default MemberService;
