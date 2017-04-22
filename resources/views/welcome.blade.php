<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link href="/css/app.css" rel="stylesheet" type="text/css">

        <title>Nails</title>

        {{-- React app --}}
        <div id="app"></div>
        <script src="/js/app.js"></script>










        <script id="__bs_script__">//<![CDATA[
            document.write("<script async src='http://HOST:3002/browser-sync/browser-sync-client.js?v=2.18.8'><\/script>".replace("HOST", location.hostname));
            //]]></script>
    </body>
</html>
