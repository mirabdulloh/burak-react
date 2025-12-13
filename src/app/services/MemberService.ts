import axios from "axios";
import { serverApi } from "../../lib/config";
import { LoginInput, Member, MemberInput } from "../../lib/types/member";


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

  public async signup(input:MemberInput): Promise<Member> {
    try {
      let url = this.path + "/member/signUp";
      const result = await axios.post(url, input, {withCredentials: true});
      console.log("signup:", result);
      const member:Member = result.data as Member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("MemberService - signup error:", err);
      throw err;
    }
  }

  public async login(input:LoginInput): Promise<Member> {
    try {
      let url = this.path + "/member/login";
      const result = await axios.post(url, input, {withCredentials: true});
      console.log("signup:", result);
      const member:Member = result.data as Member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("MemberService - signup error:", err);
      throw err;
    }
  }

  public async logout(): Promise<boolean> {
    try{
      let url = this.path + "/member/logout";
      const result = await axios.post(url,{}, {withCredentials: true});
      localStorage.removeItem("memberData");
      console.log("logout:", result);
      return result.data.logout;
    }catch(err){
      console.log("MemberService - logout error:", err);
      throw err;
    }
  }
}

export default MemberService;
