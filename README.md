# Azzurro Roster

This is the GitHub Pages frontend for the Azzurro Hotels roster. It uses Supabase for authentication and data storage.

## Setup order

1. Open the Supabase dashboard for the project.
2. Open **SQL Editor**, paste the contents of `supabase-schema.sql`, and run it once.
3. In **Authentication > Users**, create the admin account. Team member Auth accounts are optional.
4. Add the team-member records described below. Team members can file leave without signing in.
5. Upload all files in this folder to the `AzzurroHotels/Roster` repository.
6. In GitHub, open **Settings > Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.

## Add the first admin

After creating the admin user in Supabase Authentication, run:

```sql
insert into public.user_roles (user_id, role)
values ('ADMIN-AUTH-USER-UUID', 'admin');
```

## Add a team member

Run an insert like this for each team member. The `auth_user_id` can stay `null` because the public leave form does not require sign-in:

```sql
insert into public.team_members
  (auth_user_id, name, email, department, performance_score, max_days, available_days, allowed_properties)
values
  (null, 'Sobit', 'sobit@example.com', 'reception', 4.0, 5, '{0,1,2,3,4,5,6}', '{all}');
```

If you later want a team member to sign in, create their Auth account and add their UUID to `auth_user_id`; a team role row is only needed for that optional login.

Use `reception`, `backoffice`, or `housekeeping` for the department. Days use Monday as `0` and Sunday as `6`.

## Pages

- `#/roster` is the public read-only roster page.
- `#/login` is the Supabase sign-in page.
- `#/admin` is the protected admin workspace.

Team members can view the published roster and submit leave without signing in. The leave form asks for their name, start date, end date, and an optional reason. Requests remain pending until an admin approves or disapproves them. Approved leave is excluded from automatic generation and manual assignment options.

Team member records still need to exist in `team_members` so names can be selected in the public leave form. Team members do not need Supabase Auth accounts to submit leave.

## Supabase configuration

The public project URL and anon key are in `config.js`. The anon key is intended for browser applications. Never put a Supabase service-role key in this repository.
