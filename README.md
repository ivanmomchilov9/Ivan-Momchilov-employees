# Employee Pair Tracker

This is a **React Native** application that identifies the pair of employees who have worked together on common projects for the longest period of time.

## 📋 Task Description

Create an application that:

1. Loads employee project data from a **CSV file**.
2. Identifies pairs of employees who have worked together on the same project.
3. Calculates the **total time** they’ve worked together on overlapping project periods.
4. Displays all common projects in a **DataGrid** with:
   - Employee ID #1
   - Employee ID #2
   - Project ID
   - Days Worked

## 🚀 Getting Started

> **Note**: Ensure your environment is ready following the [React Native Environment Setup Guide](https://reactnative.dev/docs/environment-setup).

### Step 1: Install Dependencies

```sh
# Install JS dependencies
npm install

# For iOS (run only once or when updating native deps)
cd ios
bundle install
bundle exec pod install
```

### Step 2: Start Metro

```sh
npm start
# or
yarn start
```

### Step 3: Run the App

#### Android

```sh
npm run android
# or
yarn android
```

#### iOS

```sh
npm run ios
# or
yarn ios
```

If setup is complete, the app will launch on the **Android Emulator**, **iOS Simulator**, or a **physical device**.
