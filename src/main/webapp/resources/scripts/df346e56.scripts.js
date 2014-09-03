(function(){"use strict";angular.module("pubnub.angular.service",[]).factory("PubNub",["$rootScope",function(a){var b,c,d,e,f;for(b={_instance:null,_channels:[],_presence:{},jsapi:{}},f=["map","each"],d=0,e=f.length;e>d;d++)c=f[d],("undefined"!=typeof PUBNUB&&null!==PUBNUB?PUBNUB[c]:void 0)instanceof Function&&!function(a){return b[a]=function(){var c;return null!=(c=b._instance)?c[a].apply(b._instance,arguments):void 0}}(c);for(c in PUBNUB)("undefined"!=typeof PUBNUB&&null!==PUBNUB?PUBNUB[c]:void 0)instanceof Function&&!function(a){return b.jsapi[a]=function(){var c;return null!=(c=b._instance)?c[a].apply(b._instance,arguments):void 0}}(c);return b.initialized=function(){return!!b._instance},b.init=function(){return b._instance=PUBNUB.init.apply(PUBNUB,arguments),b._channels=[],b._presence={},b._instance},b.destroy=function(){return b._instance=null,b._channels=null,b._presence=null},b._ngFireMessages=function(c){return function(d){return b.each(d[0],function(b){return a.$broadcast("pn-message:"+c,{message:b,channel:c})})}},b._ngInstallHandlers=function(c){var d,e;return d=c.message,c.message=function(){return a.$broadcast(b.ngMsgEv(c.channel),{message:arguments[0],env:arguments[1],channel:c.channel}),d?d(arguments):void 0},e=c.presence,c.presence=function(){var d,f,g,h;return g=arguments[0],d=c.channel,g.uuids?b.each(g.uuids,function(a){var c;return(c=b._presence)[d]||(c[d]=[]),b._presence[d].indexOf(a)<0?b._presence[d].push(a):void 0}):g.uuid&&g.action&&((h=b._presence)[d]||(h[d]=[]),"leave"===g.action?(f=b._presence[d].indexOf(g.uuid),-1!==f&&b._presence[d].splice(f,1)):b._presence[d].indexOf(g.uuid)<0&&b._presence[d].push(g.uuid)),a.$broadcast(b.ngPrsEv(c.channel),{event:g,message:arguments[1],channel:d}),e?e(arguments):void 0},c},b.ngListChannels=function(){return b._channels.slice(0)},b.ngListPresence=function(a){var c;return null!=(c=b._presence[a])?c.slice(0):void 0},b.ngSubscribe=function(a){var c,d;return b._channels.indexOf(a.channel)<0&&b._channels.push(a.channel),(c=b._presence)[d=a.channel]||(c[d]=[]),a=b._ngInstallHandlers(a),b.jsapi.subscribe(a)},b.ngUnsubscribe=function(c){var d;return d=b._channels.indexOf(c.channel),-1!==d&&b._channels.splice(d,1),b._presence[c.channel]=null,delete a.$$listeners[b.ngMsgEv(c.channel)],delete a.$$listeners[b.ngPrsEv(c.channel)],b.jsapi.unsubscribe(c)},b.ngPublish=function(){return b._instance.publish.apply(b._instance,arguments)},b.ngHistory=function(a){return a.callback=b._ngFireMessages(a.channel),b.jsapi.history(a)},b.ngHereNow=function(a){return a=b._ngInstallHandlers(a),a.callback=a.presence,delete a.presence,delete a.message,b.jsapi.here_now(a)},b.ngMsgEv=function(a){return"pn-message:"+a},b.ngPrsEv=function(a){return"pn-presence:"+a},b}])}).call(this);var app=angular.module("spaApp",["ngCookies","ngResource","ngSanitize","ngRoute","pubnub.angular.service","infinite-scroll"]);app.config(["$routeProvider","$locationProvider","$httpProvider",function(a,b,c){c.responseInterceptors.push("httpInterceptor"),a.when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/accounts",{templateUrl:"views/accounts.html",controller:"AccountsCtrl",resolve:{accounts:["accountsProvider",function(a){return a.getAccounts()}]}}).when("/accounts/:accountId/transactions",{templateUrl:"views/transactions.html",controller:"TransactionsCtrl",resolve:{accounts:["accountsProvider",function(a){return a.getAccounts()}]}}).when("/administration/admin-card",{templateUrl:"views/partials/admin/cards.html"}).when("/administration/contract",{templateUrl:"views/partials/admin/contract.html"}).when("/administration/configuration",{templateUrl:"views/partials/admin/configuration.html"}).when("/administration/accounts-clabe",{templateUrl:"views/partials/admin/clabe.html",controller:"ClabeCtrl",url:"accounts-clabe",resolve:{accounts:["accountsProvider",function(a){return a.getAccounts()}]}}).when("/administration/checks",{templateUrl:"views/partials/admin/checks.html",controller:"ChecksCtrl",resolve:{check_accounts:["checkAccountsProvider",function(a){return a.getCheckAccounts()}]}}).otherwise({redirectTo:"/accounts"})}]),app.run(["api","$window","$rootScope",function(a,b,c){a.config(),a.init(),b.onbeforeunload=function(a){var d="Te vas a salir de ABanking, ¿estás seguro?";return a=a||b.event,a.preventDefault=!0,a.cancelBubble=!0,c.session_token?(a.returnValue=d,d):void 0}}]),app.run(["$rootScope","PubNub","accountsProvider",function(a,b,c){var d=function(){console.log("joining PubNub..."),b.init({subscribe_key:a.subscribeKey,publish_key:a.subscribeKey,ssl:!0})},e=function(d){a.pubNubChannel=d,b.ngSubscribe({channel:a.pubNubChannel}),console.log("subscribed to "+a.pubNubChannel),a.$on(b.ngMsgEv(a.pubNubChannel),function(a,b){var d=b.message.messageType;"transaction"==d&&c.addNewTransaction(b.message.user,b.message.transaction,b.message.account)})};a.initPubNub=function(){d(),e(a.session_token),console.log("Channel => "+a.session_token)},a.session_token&&a.initPubNub()}]);var mod;mod=angular.module("infinite-scroll",[]),mod.directive("infiniteScroll",["$rootScope","$window","$timeout",function(a,b,c){return{link:function(d,e,f){var g,h,i,j;return b=angular.element(b),i=0,null!=f.infiniteScrollDistance&&d.$watch(f.infiniteScrollDistance,function(a){return i=parseInt(a,10)}),j=!0,g=!1,null!=f.infiniteScrollDisabled&&d.$watch(f.infiniteScrollDisabled,function(a){return j=!a,j&&g?(g=!1,h()):void 0}),h=function(){var c,h,k,l;return l=b.height()+b.scrollTop(),c=e.offset().top+e.height(),h=c-l,k=b.height()*i>=h,k&&j?a.$$phase?d.$eval(f.infiniteScroll):d.$apply(f.infiniteScroll):k?g=!0:void 0},b.on("scroll",h),d.$on("$destroy",function(){return b.off("scroll",h)}),c(function(){return f.infiniteScrollImmediateCheck?d.$eval(f.infiniteScrollImmediateCheck)?h():void 0:h()},0)}}}]),angular.module("spaApp").factory("api",["$http","$rootScope",function(a,b){return{init:function(c){a.defaults.headers.common["X-BANK-TOKEN"]=2,a.defaults.headers.common["X-AUTH-TOKEN"]=c||b.session_token,console.log("Executes init & token = "+b.session_token)},config:function(){b.restAPIBaseUrl="http://projects.anzen.com.mx:8081/Abanking-Core/rest/",b.subscribeKey="sub-c-74d472c2-894a-11e3-a56b-02ee2ddab7fe",b.publishKey="pub-c-d49c709c-8d0c-40ed-aaa6-66cbc20683d0"}}}]),angular.module("spaApp").service("accountsService",["$http","$rootScope",function(a,b){this.getAccounts=function(){return a.get(b.restAPIBaseUrl+"/accounts")},this.getAccount=function(c,d,e){return a.get(b.restAPIBaseUrl+"/accounts/"+c+"/transactions?page="+d+"&size="+e)}}]),angular.module("spaApp").factory("accountsProvider",["$rootScope","accountsService","$q",function(a,b,c){return{getAccountIndex:function(b){for(var c=0;c<a.accounts.length;c++)if(a.accounts[c]._account_id==b)return c;throw new Error("account does not exist")},getAccounts:function(){var d=c.defer();return a.accounts?d.resolve():(console.log("getting accounts"),b.getAccounts().success(function(b){a.accounts=b.accounts,d.resolve()}).error(function(a,b){return console.log(a,b),d.reject("Error getting accounts")})),d.promise},getAccountTransactions:function(d,e,f){var g=this.getAccountIndex(d),h=a.accounts[g],i=c.defer();return 1==h.allTransactionsLoaded?i.resolve():(console.log("getting transactions for account "+d+" from page "+e),b.getAccount(d,e,f).success(function(b){if(b.transactions){for(var c=b.transactions,d=0;d<c.length;d++)a.transactions.push(c[d]);c.length<f&&(h.allTransactionsLoaded=!0)}else h.allTransactionsLoaded=!0;i.resolve()}).error(function(a,b){return console.log(a,b),i.reject({status:b,mesage:"Error getting transactions"})})),i.promise},addNewTransaction:function(b,c,d){var e=this.getAccountIndex(d._account_id);0>e||(a.currentAccount&&a.currentAccount._account_id==d._account_id&&!a.accounts[e].transactions?a.$apply(function(){a.accounts[e].balance=d.balance}):(a.accounts[e].transactions?a.accounts[e].transactions.splice(0,0,c):a.accounts[e].transactions=[c],a.$apply(function(){a.accounts[e].balance=d.balance,a.currentAccount&&a.currentAccount._account_id===d._account_id&&(a.currentAccount.balance=d.balance)})))}}}]),angular.module("spaApp").service("checksService",["$http",function(a){this.getCheckAccounts=function(){return a.get("/fixtures/check_accounts.js")}}]),angular.module("spaApp").factory("checkAccountsProvider",["$rootScope","checksService","$q",function(a,b,c){return{getCheckAccounts:function(){var d=c.defer();return a.check_accounts?d.resolve():b.getCheckAccounts().success(function(b){a.check_accounts=b.check_accounts,d.resolve()}).error(function(){return d.reject("Error obteniendo cuentas de cheques")}),d.promise}}}]),angular.module("spaApp").factory("httpInterceptor",["$q","$window","$location","$rootScope",function(a,b,c,d){return function(b){var e=function(a){return a},f=function(b){return b.status||(console.log("Response undefined"),c.url("/login")),(400===b.status||503===b.status||500===b.status)&&(d.session_token=null,console.log("Status 400 or 503"),c.url("/login")),a.reject(b)};return b.then(e,f)}}]),angular.module("spaApp").controller("LoginCtrl",["$scope","$http","$location","api","$rootScope",function(a,b,c,d,e){a.login=function(){b({url:a.restAPIBaseUrl+"/login",method:"POST",data:JSON.stringify({username:a.username,password:a.password,access_media:"SPA"})}).success(function(b,f,g){var h=g("X-AUTH-TOKEN");e.session_token=h,e.last_access_date=b.last_access_date,e.last_access_media=b.last_access_media,d.init(),a.initPubNub(),c.path("/accounts")}).error(function(b,c){a.errorMessage=b.message,a.status=c})},a.logout=function(){b({url:a.restAPIBaseUrl+"/logout",method:"GET"}).success(function(b,d){a.message="logout successful",a.status=d,e.session_token=null,c.path("/login")}).error(function(b,d){a.errorMessage="logout failed",a.status=d,e.session_token=null,c.path("/login")})}}]),angular.module("spaApp").controller("AccountsCtrl",["$scope",function(){}]),angular.module("spaApp").controller("TransactionsCtrl",["$rootScope","$scope","$location","$routeParams","$timeout","accountsProvider","thirdAccountProvider",function(a,b,c,d,e,f,g){function h(){k=!1,m=!1,l=!1}try{var i=f.getAccountIndex(d.accountId)}catch(j){c.path("/accounts")}a.currentAccount=a.accounts[i],b.selection="",b.currentTransaction=void 0;var k=!1,l=!1,m=!1;b.numPage=0,a.transactions=new Array,a.currentAccount.allTransactionsLoaded=!1;var n=0,o=2;b.clientOrServerBusy=function(){return k||l},b.error=function(){return m},b.nextPage=function(){k||(k=!0,f.getAccountTransactions(d.accountId,b.numPage,10).then(function(){b.numPage=b.numPage+1,h()},function(a){h(),404==a.status&&o>n?(n++,l=!0,e(function(){b.nextPage()},2e3)):m=!0,console.log(a)}))},b.showTransactionDetail=function(a){b.currentTransaction&&b.currentTransaction._transaction_id===a._transaction_id?(b.selection=void 0,b.currentTransaction=void 0):(b.selection="transaction",b.currentTransaction=a)},b.close=function(){b.selection=void 0,b.currentTransaction=void 0},b.showServices=function(){b.selection="services",b.currentTransaction=void 0},b.showServicePayment=function(){b.selection="servicespayment"},b.showServicePaymentToken=function(){b.selection="servicespaymenttoken",b.token=void 0,e(function(){b.token=!0},2e3)},b.applyServicePayment=function(){b.selection="applyservicespayment"},b.selectedCard=null,b.showCards=function(){b.selection="cards",b.currentTransaction=void 0,b.card={current:null},b.cards=[{id:1,name:"Roberto Rivera López",lastdigits:"**123"},{id:2,name:"Luis López Pérez",lastdigits:"**234"},{id:3,name:"Alejandro García Gómez",lastdigits:"**345"},{id:4,name:"Alicia Rubinstein",lastdigits:"**456"}]},b.updateCard=function(){b.selection="cardspayment"},b.showCardPaymentToken=function(){b.selection="cardspaymenttoken",b.token=void 0,e(function(){b.token=!0},2e3)},b.applyCardPayment=function(){b.selection="applycardpayment"},b.showTransfers=function(){b.selection="transfers",b.currentTransaction=void 0;var c=new Date,d=c.getDate(),e=c.getMonth()+1,f=c.getFullYear();10>d&&(d="0"+d),10>e&&(e="0"+e),c=d+"/"+e+"/"+f,b.beneficiary={current:null},b.transfer={amount:"",date:c,sendmail:!1,message:""},g.getThirdAccounts().then(function(){b.beneficiaries=a.thirdAccounts.beneficiaries})},b.showAddBeneficiary=function(){b.selection="addbeneficiary"},b.updateTransfer=function(){b.selection="transferspayment"},b.authorize=function(a,c,d,e,f){console.log(b.names),b.names=a,b.clabe=c,b.amount=d,b.email=e,b.number=f,b.selection="addbeneficiaryconfirm"},b.test=function(){console.log("begin invoke function")},b.showTransferPaymentToken=function(){b.selection="transferspaymenttoken",b.token=void 0,e(function(){b.token=!0},2e3)},b.applyTransferPayment=function(){b.selection="applytransferpayment"},b.showAddBeneficiary=function(){b.selection="addbeneficiary",b.benef={name:"",clabe:"",amount:"",email:"",phone:""}},b.confirmBeneficiary=function(a,c,d,e,f){g.setBeneficiary(a,c,d,e,f),b.selection="addbeneficiaryconfirm"},b.showAddCard=function(){b.selection="addcard",b.benef={name:"",card:"",amount:""}},b.confirmCard=function(){b.selection="addcardconfirm"},b.sorting={column:"created_at",descending:!0},$(".account-menu-buttons.pull-right .btn").click(function(){$(".account-menu-buttons.pull-right .btn").removeClass("active"),$(this).addClass("active")}),b.selectSortingClass=function(a){return a==b.sorting.column&&"glyphicon-chevron-"+(b.sorting.descending?"down":"up")},b.changeSorting=function(a){var c=b.sorting;c.column==a?c.descending=!c.descending:(c.column=a,c.descending=!1)}}]),angular.module("spaApp").controller("ClabeCtrl",["$scope","$http","$location","$rootScope",function(){}]),angular.module("spaApp").controller("ChecksCtrl",["$rootScope","$scope","checkAccountsProvider",function(){}]),angular.module("spaApp").directive("timeAccess",["$interval","dateFilter",function(a,b){return{scope:{media:"@",date:"@"},restrict:"E",templateUrl:"views/directives/time-access.html",link:function(c,d){function e(){var a=new Date;c.last_access_media=c.media,c.last_access_date=b(new Date(parseInt(c.date)),"dd/MM/yyyy hh:mm:ss"),c.week_day=b(a.getDay(),"EEEE"),c.day=a.getDate(),c.month=b(a.getMonth(),"MMMM"),c.year=a.getFullYear(),c.hour=b(a,"h:mm:ss")}var f;d.on("$destroy",function(){a.cancel(f)}),f=a(function(){e()},1e3),e()}}}]),angular.module("spaApp").directive("numbersOnly",function(){return{require:"ngModel",link:function(a,b,c,d){d.$parsers.push(function(a){if(void 0==a)return"";var b=a.replace(/[^.0-9]/g,"");return b!=a&&(d.$setViewValue(b),d.$render()),b})}}}),angular.module("spaApp").directive("jqdatepicker",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){$(function(){b.datepicker({dateFormat:"dd/mm/yy",onSelect:function(b){a.$apply(function(){d.$setViewValue(b)})}})})}}}),angular.module("spaApp").factory("thirdAccountProvider",["$q","$rootScope","thirdAccountService",function(a,b,c){return{getThirdAccounts:function(){var d=a.defer();return b.thirdAccounts?d.resolve():c.getThirdAcounts().success(function(a){b.thirdAccounts=a,d.resolve()}).error(function(){return d.reject("Error getting third accounts")}),d.promise},setBeneficiary:function(b,d,e,f,g){var h=a.defer();return c.setBeneficiary(b,d,e,f,g).success(function(){h.resolve()}).error(function(){return h.reject("Error setting beneficiary")}),h.promise},deleteThirdAccount:function(b){var d=a.defer();return c.deleteThirdAccount(b).success(function(){d.resolve()}).error(function(){return d.reject("Error deleting third account")}),d.promise},updateThirdAccount:function(b){var d=a.defer();return c.updateThirdAccount(b).success(function(){d.resolve()}).error(function(){return d.reject("Error updating third account")}),d.promise}}}]),angular.module("spaApp").service("thirdAccountService",["$http","$rootScope",function(a,b){this.getThirdAcounts=function(){return a({url:b.restAPIBaseUrl+"/externalaccounts",method:"GET",headers:{"Content-Type":"application/json","X-AUTH-TOKEN":a.defaults.headers.common["X-AUTH-TOKEN"]}})},this.setBeneficiary=function(c,d,e,f,g){return a({url:b.restAPIBaseUrl+"/externalaccounts",method:"POST",data:JSON.stringify({name:c,clabe:d,amount:e,email:f,phone:g})})},this.deleteThirdAccount=function(c){return a({url:b.restAPIBaseUrl+"/"+c,method:"DELETE"})},this.deleteThirdAccount=function(c){return a({url:b.restAPIBaseUrl+"/"+c,method:"PUT"})}}]);