import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default class _Document extends Document {
	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
					<Script id="opinekit-script" strategy="afterInteractive" defer>
						{`
		"use strict";
		!function () {
			var t = window.opineKit = window.opineKit || [];
			if (!t.init) {
				if (t.invoked) return void (window.console && console.error && console.error("OpineKit snippet included twice."));
				t.invoked = !0, t.methods = ["start", "hide", "on", "off", "show", "debug", "config"], t.q = [],
					t.factory = function (e) {
						return function () {
							var n = Array.prototype.slice.call(arguments);
							return n.unshift(e), t.q.push(n), t;
						};
					}, t.methods.forEach(function (e) {
						t[e] = t.factory(e);
					}), t.load = function () {
						var o = document.createElement("script");
						o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://opinekit.com/embed.js";
						var i = document.getElementsByTagName("script")[0];
						i.parentNode.insertBefore(o, i);
					};
			}
		}();
		opineKit.load();              
              `}
					</Script>
				</body>
			</Html>
		);
	}
}
