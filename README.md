# it2810-webutvikling-h18-prosjekt-3-05

## Intro
### Tutorials how to use this amazing app
npm install
npm i react-native-paper

## About React Native
React Native er et rammeverk som generer "real mobile app" fra JavaScript for flere platformer isteden for en hybrid med web view. React Native lar deg lage en mobil app ved hjelp av JavaScript og React biblioteket. En av de største fordelene med Native er at den har delt kodebase for iOS og Android. Siden rammeverket er ekstremt populært så støtter det en rekke forskjellige plugins og trdejepartsbibliotek for å utvide funskjonalitetmulgheter til appen din. Det gir utvikleren en bred spekter av løsningsmuligheter.
React Native har mange innebygde komponenter som er lett å ta i bruk. For exempel <View>- komponentet er brukt for å vise inneholdet på skjermen.


### Why Native? (den skal mest sannsynlig slettes, har den bare for å lære noe selv og just in case)
A native mobile app is a smartphone application that is coded in a specific programming language, such as Objective C for iOS or Java for Android operating systems. Native mobile apps provide fast performance and a high degree of reliability. They also have access to a phone's various devices, such as its camera and address book.

## Third-party-libraries and Tools
### * [Expo](https://expo.io/)
Expo er et verktøysett som hjelper å utvikle en app uansett platform. Fordelene er at man kobler til gjennom wi-fi og slipper å bruke USB som i lokal bygging av app og at applikasjonen blir oppdatert umiddelbart etter man lagrer endringer.

### * [React Native Paper](https://callstack.github.io/react-native-paper/index.html)
Dette biblioteket tilbyr godt utformet Material Design-klare designkomponenter som fungerer og ser ut nesten likt både på iOS og Android. Komponenter har en universiell utforming som er intuitive for brukeren å ta i bruk og er ment å hjelpe å skape gode brukeropplevelser.  

### * [Expo Pedometer](https://docs.expo.io/versions/latest/sdk/pedometer)  
Expo has an example implementation of a pedometer that uses Core Motion (iOS) and Google Fit (Android) to get the user's step count. Using this method we were able to get the step count on both operating systems, except for one issue that occurs when reloading the expo client, this error is however caused by expo not running the componentWillUnmount() function upon reload. The user will not be signed out from the GoogleApiClient and upon sign-in the error "Already managing a GoogleApiClient with id 0" will pop-up. This will not be a problem in production.  

- react-navigation library why and how

## Layout
Bruker Flexbox da den rangerer/ plasserer elementer i forhold til hverandre.

## Local Storage

## Testing
Testing har vært en vitkig del i utviklingsprosessen av appen vår. I starten testet vi for det meste på mobil, for å se at komponentene fungerte som de skulle i appen og for å se hvordan stylingen og plasseringen av elementene ble. Etter hvert som komponentene ble ferdig, begynte vi å teste dem med Jest.

### Jest
Jest er utviklet for å teste all JavaScript-kode inkludert React. Det blir hovedsakelig brukt til Unit- og Snapchottesting og er relativt lett å skrive i, da syntaxen ligger tett opp mot det engelske språket.

Én av våre hovedutfordringer da vi testet med Jest, var at Jest ikke kan teste endringer i state og trigging av funksjoner i parent- eller childkomponenter. Fordi de fleste av våre funksjoner enten oppdaterer state eller kaller funksjoner i andre komponenter, har vi måttet benytte oss av flere mock-funksjoner. Istedenfor å teste endring i state, har vi valgt å teste at setState-funksjoner blir kalt. Det samme gjelder kall på funksjoner i andre komponenter. Også her har vi valgt å sjekke at rett funksjon blir kalt, heller enn å sjekke resultatet av funksjonskallet.

### Testing on Android and iOS devices
I utvikling av prosjektet hadde vi 2 iOS-enheter(iPhoneSE og iPhone6) og en Android(OnePlus 6).
Siden vi alltid kjørte Expo ved utvikling av appen fikk vi testet nylig lagt funskjonalitet fortløpende.
### Få noen randoms til å teste appen vår mot slutten og få noen tilbakemeldinger der
Docce det her og kanskje legge til et par bilder av vår magic app.

## How we used Git

## Sources
* [Your next React Native app will be done with Paper](https://blog.callstack.io/your-next-react-native-app-will-be-done-with-paper-40eebd88be98)
