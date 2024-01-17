# Consent Test

It's just a small dashboard simulating a Consent Dashboard

All data is mocked and no actual database is used

## Running it

You can see the project running at <https://testconsent.netlify.app/>

You can also run it locally by cloning this project into your local computer

Once doing that and navigating inside the folder run `yarn` and `yarn dev`

### Reminders

* I want to remind you that there is no database and all data is mocked, using browser memory

* The original prompt didn't include any kind of update, but thinking on user side, I took liberty of adding a condition which the data "sent" will update an existing one, in case the "sent" email is already in "database". In this case it will update `Name` and `Consents` for that `Email`
