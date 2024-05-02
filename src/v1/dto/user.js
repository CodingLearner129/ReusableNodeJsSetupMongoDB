export class UserLogInDTO {
    constructor(user) {
        this.first_name = user.first_name ?? "";
        this.last_name = user.first_name ?? "";
        this.gender = user.gender ?? 0;
        this.country_code = user.country_code ?? "";
        this.phone = user.phone ?? "";
        this.dob = user.dob ?? 0;
        this.profile = user.profile ?? "";
        this.bio = user.bio ?? "";
        this.height = user.height ?? 0;
        this.height_type = user.height_type ?? 0;
        this.weight = user.weight ?? 0;
        this.weight_type = user.weight_type ?? 0;
        this.dietary = user.dietary ?? 0;
        this.fitness_goals = user.fitness_goals ?? [];
        this.email = user.email ?? "";
        this.location = user.location ?? {};
        this.postcode = user.postcode ?? "";
        this.insta_link = user.insta_link ?? "";
        this.is_plan_active = user.is_plan_active ?? false;
        this.allow_notification = user.allow_notification ?? true;
        this.allow_dm = user.allow_dm ?? true;
        this.profile_verified_at = user.profile_verified_at ?? 0;
        this.created_at = user.created_at ?? 0;
        this.updated_at = user.updated_at ?? 0;
        if (user.accessToken) {
            this.accessToken = user.accessToken ?? "";
        }
    }
}

export class UserProfileDTO {
    constructor(user) {
        this.first_name = user.first_name ?? "";
        this.last_name = user.last_name ?? "";
        this.full_name = user.full_name ?? "";
        this.email = user.email ?? "";
        this.image = getImage(user.image);
        this.created_at = user.created_at ?? 0;
        this.updated_at = user.updated_at ?? 0;
        this.deleted_at = user.deleted_at ?? 0;
    }
}

export class UsersListDTO {
    constructor(users) {
        return users.map(user => {
            return {
                first_name: user.first_name ?? "",
                last_name: user.last_name ?? "",
                full_name: user.full_name ?? "",
                email: user.email ?? "",
                image: getImage(user.image),
                created_at: user.created_at ?? 0,
                updated_at: user.updated_at ?? 0,
                deleted_at: user.deleted_at ?? 0
            }
        })
    }
}

export class GetUserDTO {
    constructor(user) {
        this.id = user.id;
        this.first_name = user.first_name ?? "";
        this.last_name = user.last_name ?? "";
        this.full_name = user.full_name ?? "";
        this.email = user.email ?? "";
        this.image = getImage(user.image);
        this.created_at = user.created_at ?? 0;
        this.updated_at = user.updated_at ?? 0;
        this.deleted_at = user.deleted_at ?? 0;
    }
}