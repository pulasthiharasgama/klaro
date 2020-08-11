// By default, Klaro will load the config from  a global "klaroConfig" variable.
// You can change this by specifying the "data-config" attribute on your
// script take, e.g. like this:
// <script src="klaro.js" data-config="myConfigVariableName" />
// You can also disable auto-loading of the consent notice by adding
// data-no-auto-load=true to the script tag.
var klaroConfig = {
    // You can customize the ID of the DIV element that Klaro will create
    // when starting up. If undefined, Klaro will use 'klaro'.
    elementID: 'klaro',

    // How Klaro should store the user's preferences. It can be either 'cookie'
    // (the default) or 'localStorage'.
    storageMethod: 'cookie',

    // You can customize the name of the cookie that Klaro uses for storing
    // user consent decisions. If undefined, Klaro will use 'klaro'.
    cookieName: 'klaro',

    // You can also set a custom expiration time for the Klaro cookie.
    // By default, it will expire after 120 days.
    cookieExpiresAfterDays: 365,

    // You can change to cookie domain for the consent manager itself.
    // Use this if you want to get consent once for multiple matching domains.
    // If undefined, Klaro will use the current domain.
    //cookieDomain: '.github.com',

    // Put a link to your privacy policy here (relative or absolute).
    privacyPolicy: '/#privacy',

    // Defines the default state for applications (true=enabled by default).
    default: false,

    // If "mustConsent" is set to true, Klaro will directly display the consent
    // manager modal and not allow the user to close it before having actively
    // consented or declines the use of third-party apps.
    mustConsent: false,

    // Show "accept all" to accept all apps instead of "ok" that only accepts
    // required and "default: true" apps
    acceptAll: false,

    // replace "decline" with cookie manager modal
    hideDeclineAll: false,

    // You can define the UI language directly here. If undefined, Klaro will
    // use the value given in the global "lang" variable. If that does
    // not exist, it will use the value given in the "lang" attribute of your
    // HTML tag. If that also doesn't exist, it will use 'en'.
    //lang: 'en',

    // You can overwrite existing translations and add translations for your
    // app descriptions and purposes. See `src/translations/` for a full
    // list of translations that can be overwritten:
    // https://github.com/KIProtect/klaro/tree/master/src/translations

    // Example config that shows how to overwrite translations:
    // https://github.com/KIProtect/klaro/blob/master/src/configs/i18n.js
    translations: {
        // If you erase the "consentModal" translations, Klaro will use the
        // bundled translations.
        de: {
            consentModal: {
                description:
                    'Hier können Sie einsehen und anpassen, welche Information wir über Sie sammeln. Einträge die als "Beispiel" gekennzeichnet sind dienen lediglich zu Demonstrationszwecken und werden nicht wirklich verwendet.',
            },
            cloudflare: {
                description: 'Schutz gegen DDoS-Angriffe',
            },
            intercom: {
                description:
                    'Chat Widget & Sammeln von Besucherstatistiken (nur ein Beispiel)',
            },
            purposes: {
                analytics: 'Besucher-Statistiken',
                security: 'Sicherheit',
                livechat: 'Live Chat',
                advertising: 'Anzeigen von Werbung',
                styling: 'Styling',
            },
            groups: {
                analytics: 'Analytik',
                marketing: 'Marketing',
            },
        },
        en: {
            consentModal: {
                description:
                    'Here you can see and customize the information that we collect about you. Entries marked as "Example" are just for demonstration purposes and are not really used on this website.',
            },
            cloudflare: {
                description: 'Protection against DDoS attacks',
            },
            googleAnalytics: {
                description: 'Google Analytics is a web analytics service offered by Google that tracks and reports website traffic',
            },
            intercom: {
                description:
                    'Chat widget & collecting of visitor statistics (just an example)',
            },
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                livechat: 'Livechat',
                advertising: 'Advertising',
                styling: 'Styling',
            },
            groups: {
                analytics: 'Analytics',
                marketing: 'Marketing',
                technical: 'Technical',
            },
        },
        tr: {
            consentModal: {
                description:
                    'Hakkınızda topladığımız bilgileri burada görebilir ve özelleştirebilirsiniz. "Örnek" olarak belirtilenler sadece gösterim amaçlıdır ve gerçekte bu site için kullanılmazlar.',
            },
            cloudflare: {
                description: 'DDoS saldırılarına karşı koruma',
            },
            intercom: {
                description:
                    'Sohbet aracı ve ziyaretçi istatistiklerini toplama (sadece bir örnek)',
            },
            purposes: {
                analytics: 'Analitik',
                security: 'Güvenlik',
                livechat: 'Canlı Sohbet',
                advertising: 'Reklam',
                styling: 'Biçimlendirme',
            },
        },
    },

    // This is a list of third-party apps that Klaro will manage for you.
    apps: [
        {
            // Each app should have a unique (and short) name.
            name: 'googleAnalytics',
            group: 'analytics',

            // If "default" is set to true, the app will be enabled by default
            // Overwrites global "default" setting.
            // We recommend leaving this to "false" for apps that collect
            // personal information.
            default: false,

            // The title of you app as listed in the consent modal.
            title: 'Google Analytics',

            // The purpose(s) of this app. Will be listed on the consent notice.
            // Do not forget to add translations for all purposes you list here.
            purposes: ['analytics'],

            // A list of regex expressions or strings giving the names of
            // cookies set by this app. If the user withdraws consent for a
            // given app, Klaro will then automatically delete all matching
            // cookies.
            cookies: [
                // you can also explicitly provide a path and a domain for
                // a given cookie. This is necessary if you have apps that
                // set cookies for a path that is not "/" or a domain that
                // is not the current domain. If you do not set these values
                // properly, the cookie can't be deleted by Klaro
                // (there is no way to access the path or domain of a cookie in JS)
            ],

            // An optional callback function that will be called each time
            // the consent state for the app changes (true=consented). Passes
            // the `app` config as the second parameter as well.
            callback: function(consent, app) {
                // This is an example callback function.
                console.log(
                    'User consent for app ' + app.name + ': consent=' + consent
                );
            },

            // If "required" is set to true, Klaro will not allow this app to
            // be disabled by the user.
            required: false,

            // If "optOut" is set to true, Klaro will load this app even before
            // the user gave explicit consent.
            // We recommend always leaving this "false".
            optOut: false,

            // If "onlyOnce" is set to true, the app will only be executed
            // once regardless how often the user toggles it on and off.
            onlyOnce: false,
        },

        // The apps will appear in the modal in the same order as defined here.
        {
            name: 'intercom',
            group: 'analytics',
            title: 'Intercom',
            default: false,
            purposes: ['livechat'],
        },
        {
            name: 'intercom2',
            group: 'analytics',
            title: 'Intercom2',
            default: false,
            purposes: ['livechat'],
        },
        {
            name: 'intercom3',
            group: 'marketing',
            title: 'Interco3m',
            default: false,
            purposes: ['livechat'],
        },
        {
            name: 'intercom4',
            group: 'marketing',
            title: 'Intercom4',
            default: false,
            purposes: ['livechat'],
        },
        {
            name: 'intercom6',
            group: 'marketing',
            title: 'Intercom6',
            default: false,
            purposes: ['livechat'],
        },
        {
            name: 'cloudflare',
            group: 'technical',
            title: 'Cloudflare',
            purposes: ['security'],
            required: true,
        },
        {
            name: 'cloudflare2',
            group: 'technical',
            title: 'Cloudflare2',
            purposes: ['security'],
            required: true,
        },
    ],
};