// jQuery animate()
$(document).ready(function () {
    $('#next-button1').on('click', function () {
        stackAnimation1();
    });
});

// CSS animate
$(document).ready(function () {
    $('#next-button2').on('click', function () {
        stackAnimation2();
    });
});

// クリック後の処理
function stackAnimation1() {
    // TODO: class=stacked-item のスタックリスト取得（画像リスト）
    const images = $('#image-container').children('.stacked-item')
    // TODO: 最上位のスタック取得: last()
    const topImage = images.last()

    topImage
        .animate({
            opacity: 0.8,
            left: '100%',
            marginTop: '-50px',
        }, 500,
            // アニメーション終了後の処理
            function () {
                resetPosition()
            }
        );

    // 元に戻すアニメーション
    function resetPosition() {
        // TODO: 重ね順をオート設定: css('z-index', 'auto')
        topImage.css('z-index', 'auto')
        // TODO: 自分の要素 $(this) を id=image-container の先頭に移動: prependTo()
        // TODO: 元の位置に戻すアニメーション: left: 0, top: 0, opacity: 0
        topImage.prependTo('#image-container')
            .animate({
                opacity: 1,
                left: 0,
                marginTop: 0,
            })
    }
}

function stackAnimation2() {
    const images = $('#image-container').children('.stacked-item');
    const topImage = images.last();

    // フェードアウト
    topImage.addClass('swipe-out');

    // 移動終了後の処理
    // CSSアニメーションが終わったら実行
    topImage.one('transitionend', function () {
        // 要素を先頭に移動
        topImage.prependTo('#image-container');
        swipeIn();
    });

    function swipeIn() {
        setTimeout(() => {
            // スライドアウトアニメーション削除
            topImage.removeClass('swipe-out');
            // スライドインアニメーション追加
            topImage.addClass('swipe-in');

            topImage.one('transitionend', function () {
                // スライドインアニメーション削除
                topImage.removeClass('swipe-in');
            });
        }, 100);
    }
}