<script setup>

import {ref} from "vue";

const titleArticles = ref('Звезда Ютуба и нутрициологии Сергей Вялов вместе со Skillbox проведут двухдневный марафон здоровья. Там вы познакомитесь с профессией нутрициолога и получите первые навыки формирования сбалансированного рациона.')
const textArticles = ref(`
— Инсайты действующих врачей и нутрициологов с высшим образованием, включая специального гостя Сергея Вялова. <br>— Практические советы, как питание может помочь сохранить молодость и энергию. <br>— Информация о карьерных перспективах в нутрициологии. <br>— Разрушение мифов о диетах: почему большинство диет не только неэффективны, но и могут быть вредны для здоровья. <br><br>В конце разыграют книгу Сергея Вялова «Трекер питания и дефицитов. Руководство от гастроэнтеролога» с автографом автора. Удалёнщики, которые завтракают в 15 часов, записываются по ссылке: <a href="https://epic.st/nu7Ek?erid=2Vtzqv2GeE3" target="_blank" rel="noopener">https://epic.st/nu7Ek?erid=2Vtzqv2GeE3</a> <br><br>Реклама. ЧОУ ДПО «Образовательные технологии «Скилбокс (Коробка навыков)», ИНН: 9704088880
`)

</script>

<template lang="pug">
  .button
    .tg-post
      .header-post
        .row.justify-between
          .title-name.row.justify-start.items-center
            span кабачковая икра по акции
            img(src="~/src/assets/verifited-tg.png")
          img(src="~/src/assets/tg-logo.png")

      .preview-post
        img(src="~/src/assets/post1.jpg")

      .content-post
        .title-articles {{ titleArticles }}
        .text-articles.q-mt-md(v-html="textArticles")

      .footer-post
        .row.justify-end.items-center
          .views
            span 40.4К
            img(src="~/src/assets/views.svg")

          .edited
            span edited

          .date-post
            span Jun 17 at 21:03
</template>

<style scoped lang="scss">
.button {
  //position: absolute;
  border-radius: 50%;
  cursor: pointer;
  margin: 40px auto;
  max-width: 100%;


  .tg-post {
    border-radius: 15px;
    border: 8px solid rgba(255, 142, 9, 0.65);
    z-index: 99999;
    position: relative;
    background-color: #fff;

    .header-post {
      background-color: #fff;
      border-radius: 8px 8px 0 0;
      padding: 3px 10px;

      img {
        width: 20px;
        height: 20px;
      }

      .title-name {
        span {
          color: $tg-color;
          font-weight: 600;
          display: block;
          margin-right: 5px;
        }
        img {
          width: 18px;
          height: 18px;
        }
      }

    }

    .preview-post {

      img {
        width: 100%;
      }
    }

    .footer-post {
      padding: 8px 10px;
      .views {
        span {
          color: $tg-footer-text;
          font-size: 12px;
          font-weight: 300;
          margin-left: 10px;
        }
        img {
          width: 15px;
          margin-left: 3px;
        }
      }

      .edited {
        color: $tg-footer-text;
        font-size: 12px;
        font-weight: 300;
        margin-left: 10px;
      }

      .date-post {
        color: $tg-footer-text;
        font-size: 12px;
        font-weight: 300;
        margin-left: 10px;
      }
    }
  }



  .tg-post:active {
    border: 8px solid rgb(255, 142, 7);
  }
}
</style>

<style lang="scss">
.content-post {
  color: #000;
  font-size: 14px;
  text-align: left;
  padding: 5px 10px;

  .title-articles {
    font-weight: 600;
    line-height: 17px;
  }
  .text-articles {
    font-weight: 500;
    line-height: 16px;
    a {
      color: #049BE5FF !important;
    }
  }
}
</style>
