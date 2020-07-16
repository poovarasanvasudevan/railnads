import {ProfileClient} from '@atlaskit/profilecard';
import {Parse} from "../../core/context";
import {avatarGenerate} from "../../core/props";


export class CustomProfileClient extends ProfileClient {

    async makeRequest(cloudId, userId) {
        console.log(userId);

        if (userId === Parse.User.current().id) {
            const profile = Parse.User.current();
            return {
                "avatarUrl": profile.get("avatar") ? profile.get("avatar").url() : avatarGenerate(profile.get("email")),
                "fullName": profile.get("first_name") + " " + profile.get("last_name"),
                "nickname": profile.get("username"),
                "email": profile.get("email"),
                "location": "",
                "meta": profile.get("username"),
                "timestring": "",
                "isCurrentUser": true
            };
        }


        var User = Parse.Object.extend("User");
        var query = new Parse.Query(User);

        var profile = await query.get(userId);

        return {
            "avatarUrl": profile.get("avatar") ? profile.get("avatar").url() : avatarGenerate(profile.get("email")),
            "fullName": profile.get("first_name") + " " + profile.get("last_name"),
            "nickname": profile.get("username"),
            "email": profile.get("email"),
            "location": "",
            "meta": profile.get("username"),
            "timestring": ""
        };
    }
}