<template>
  <v-container
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-card>
          <v-row>
            <v-card-title>Войти</v-card-title>
          </v-row>
          <v-row>
            <v-card-subtitle>
              Войдите, чтобы транскрибировать ваши записи
            </v-card-subtitle>
          </v-row>
          <v-form @submit.prevent="login">
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Email"
                    class="purple-input"
                    type="email"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Пароль"
                    class="purple-input"
                    type="password"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="green"
                    class="mr-0"
                  >
                    Войти
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'Login',
    methods: {
      async login() {
        await this.$store.dispatch('login')
      },
    },
  })
</script>
