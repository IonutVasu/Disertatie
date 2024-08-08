plugins {
<<<<<<< HEAD
    alias(libs.plugins.androidApplication)
    alias(libs.plugins.jetbrainsKotlinAndroid)
}

android {
    namespace = "com.example.sportify"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.sportify"
        minSdk = 24
=======
    alias(libs.plugins.android.application)
    alias(libs.plugins.jetbrains.kotlin.android)
}

android {
    namespace = "com.VasuIonut.aplicatiesportiva"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.VasuIonut.aplicatiesportiva"
        minSdk = 21
>>>>>>> 9532db380ce4f8ea2e6dda1341351f4f1bbd9e65
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
<<<<<<< HEAD
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
=======
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
>>>>>>> 9532db380ce4f8ea2e6dda1341351f4f1bbd9e65
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
<<<<<<< HEAD
    }
    kotlinOptions {
        jvmTarget = "1.8"
=======
    kotlinOptions {
        jvmTarget = "1.8"
        freeCompilerArgs = listOf("-Xlint:deprecation")
        allWarningsAsErrors = true
    }
>>>>>>> 9532db380ce4f8ea2e6dda1341351f4f1bbd9e65
    }
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.1"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
<<<<<<< HEAD
    implementation(libs.volley)
    implementation(libs.androidx.appcompat)
=======
    implementation(libs.androidx.appcompat)
    implementation(libs.androidx.constraintlayout)
    implementation(libs.androidx.recyclerview)
>>>>>>> 9532db380ce4f8ea2e6dda1341351f4f1bbd9e65
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.ui.test.junit4)
    debugImplementation(libs.androidx.ui.tooling)
    debugImplementation(libs.androidx.ui.test.manifest)
<<<<<<< HEAD
=======
    implementation(libs.volley)

>>>>>>> 9532db380ce4f8ea2e6dda1341351f4f1bbd9e65
}