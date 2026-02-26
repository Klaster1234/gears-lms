import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(__dirname, "..", "messages");

// Deep merge: target wins on leaf conflicts (existing keys are never overwritten)
function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (key in result) {
      // Key exists in target
      if (
        typeof result[key] === "object" &&
        result[key] !== null &&
        !Array.isArray(result[key]) &&
        typeof source[key] === "object" &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        // Both sides are plain objects -> recurse
        result[key] = deepMerge(result[key], source[key]);
      }
      // Otherwise keep target's value (do NOT overwrite)
    } else {
      // Key does NOT exist in target -> add it from source
      result[key] = source[key];
    }
  }
  return result;
}

// ── New keys per locale ──────────────────────────────────────────────

const newKeys = {
  en: {
    auth: {
      signIn: "Sign In",
      signUp: "Sign Up",
      signOut: "Sign Out",
      signInTitle: "Welcome Back",
      signInSubtitle: "Sign in to track your progress across devices",
      signUpTitle: "Create Account",
      signUpSubtitle:
        "Join Green Explorers and start your sustainability journey",
      email: "Email",
      password: "Password",
      name: "Full Name",
      continueWithGoogle: "Continue with Google",
      or: "or",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      invalidCredentials: "Invalid email or password",
      registrationFailed: "Registration failed. Please try again.",
      userExists: "An account with this email already exists.",
      adminPanel: "Admin Panel",
      passwordMin: "Password must be at least 6 characters",
    },
    admin: {
      title: "Admin Panel",
      subtitle: "Manage users and view learning progress",
      users: "Registered Users",
      name: "Name",
      email: "Email",
      provider: "Login Method",
      modulesCompleted: "Modules",
      progress: "Progress",
      certificate: "Certificate",
      joined: "Joined",
      actions: "Actions",
      deleteUser: "Delete User",
      deleteConfirm:
        "Are you sure you want to delete this user? This action cannot be undone.",
      noUsers: "No registered users yet.",
      totalUsers: "Total Users",
      withCertificate: "With Certificate",
    },
  },
  pl: {
    auth: {
      signIn: "Zaloguj się",
      signUp: "Zarejestruj się",
      signOut: "Wyloguj się",
      signInTitle: "Witaj ponownie",
      signInSubtitle:
        "Zaloguj się, aby śledzić postępy na różnych urządzeniach",
      signUpTitle: "Utwórz konto",
      signUpSubtitle:
        "Dołącz do Green Explorers i rozpocznij swoją podróż ku zrównoważonemu rozwojowi",
      email: "Email",
      password: "Hasło",
      name: "Imię i nazwisko",
      continueWithGoogle: "Kontynuuj z Google",
      or: "lub",
      noAccount: "Nie masz konta?",
      hasAccount: "Masz już konto?",
      invalidCredentials: "Nieprawidłowy email lub hasło",
      registrationFailed: "Rejestracja nie powiodła się. Spróbuj ponownie.",
      userExists: "Konto z tym adresem email już istnieje.",
      adminPanel: "Panel Admina",
      passwordMin: "Hasło musi mieć co najmniej 6 znaków",
    },
    admin: {
      title: "Panel Admina",
      subtitle: "Zarządzaj użytkownikami i śledź postępy w nauce",
      users: "Zarejestrowani użytkownicy",
      name: "Imię",
      email: "Email",
      provider: "Metoda logowania",
      modulesCompleted: "Moduły",
      progress: "Postęp",
      certificate: "Certyfikat",
      joined: "Dołączył",
      actions: "Akcje",
      deleteUser: "Usuń użytkownika",
      deleteConfirm:
        "Czy na pewno chcesz usunąć tego użytkownika? Tej akcji nie można cofnąć.",
      noUsers: "Brak zarejestrowanych użytkowników.",
      totalUsers: "Łączna liczba użytkowników",
      withCertificate: "Z certyfikatem",
    },
  },
  sk: {
    auth: {
      signIn: "Prihlásiť sa",
      signUp: "Zaregistrovať sa",
      signOut: "Odhlásiť sa",
      signInTitle: "Vitajte späť",
      signInSubtitle:
        "Prihláste sa, aby ste sledovali svoj pokrok na rôznych zariadeniach",
      signUpTitle: "Vytvoriť účet",
      signUpSubtitle:
        "Pridajte sa ku Green Explorers a začnite svoju cestu k udržateľnosti",
      email: "Email",
      password: "Heslo",
      name: "Celé meno",
      continueWithGoogle: "Pokračovať s Google",
      or: "alebo",
      noAccount: "Nemáte účet?",
      hasAccount: "Už máte účet?",
      invalidCredentials: "Neplatný email alebo heslo",
      registrationFailed: "Registrácia zlyhala. Skúste to znova.",
      userExists: "Účet s týmto emailom už existuje.",
      adminPanel: "Admin Panel",
      passwordMin: "Heslo musí mať aspoň 6 znakov",
    },
    admin: {
      title: "Admin Panel",
      subtitle: "Spravujte používateľov a sledujte pokrok v učení",
      users: "Zaregistrovaní používatelia",
      name: "Meno",
      email: "Email",
      provider: "Spôsob prihlásenia",
      modulesCompleted: "Moduly",
      progress: "Pokrok",
      certificate: "Certifikát",
      joined: "Pridaný",
      actions: "Akcie",
      deleteUser: "Odstrániť používateľa",
      deleteConfirm:
        "Ste si istí, že chcete odstrániť tohto používateľa? Túto akciu nie je možné vrátiť.",
      noUsers: "Zatiaľ žiadni zaregistrovaní používatelia.",
      totalUsers: "Celkový počet používateľov",
      withCertificate: "S certifikátom",
    },
  },
};

// ── Process each locale ──────────────────────────────────────────────

for (const locale of ["en", "pl", "sk"]) {
  const filePath = join(messagesDir, `${locale}.json`);
  console.log(`Processing ${filePath} ...`);

  const existing = JSON.parse(readFileSync(filePath, "utf-8"));
  const merged = deepMerge(existing, newKeys[locale]);

  writeFileSync(filePath, JSON.stringify(merged, null, 2) + "\n", "utf-8");

  // Verify
  const verify = JSON.parse(readFileSync(filePath, "utf-8"));
  const authKeys = Object.keys(verify.auth || {});
  const adminKeys = Object.keys(verify.admin || {});
  console.log(
    `  -> auth: ${authKeys.length} keys, admin: ${adminKeys.length} keys`
  );
}

console.log("\nDone. All three locale files updated.");
