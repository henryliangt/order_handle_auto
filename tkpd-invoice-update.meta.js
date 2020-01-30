// ==UserScript==
// @name         Tkpd invoice page Barcode + Order update
// @namespace    http://www.tiaria.id/
// @version      0.16
// @description  Handle tokopedia orders
// @author       HL
// @connect      www.tiaria.id
// @connect      google.com
// @connect      http://adakok.com/
// @connect      http://www.adakok.com/
// @connect      https://adakok.com/
// @connect      https://www.adakok.com/
// @connect      https://script.google.com/
// @connect      https://googleusercontent.com/
// @connect      https://script.googleusercontent.com/
// @connect      script.googleusercontent.com
// @connect      *
// @run-at       document-end
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require      https://cdn.jsdelivr.net/jsbarcode/3.6.0/JsBarcode.all.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_log
// @grant        GM_xmlhttpRequest
// @match        https://*.tokopedia.com/*
// @match        *.akulaku.com/*
// @match        https://merchant.blibli.com/MTA/neo/order/order-detail/?orderNo*
// @match        *.zalora.co.id/order/index/order-detail*
// @match        *.jd.id/*
// @match        *.lazada.co.id/order/detail*
// @match        https://www.bukalapak.com/payment/transactions/print_preview*
// @updateURL    https://raw.githubusercontent.com/henryliangt/order_handle_auto/master/tkpd-invoice-update.meta.js
// @downloadURL  https://raw.githubusercontent.com/henryliangt/order_handle_auto/master/tkpd-invoice-update.user.js
