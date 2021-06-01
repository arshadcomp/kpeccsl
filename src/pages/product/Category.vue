<template>
  <v-data-table
    :headers="headers"
    :items="categories"
    sort-by="parentId"
    class="elevation-1"
  >
    <template v-slot:[`item.parentId`]="{ item }">
      {{ item.parentId ? categoryName(item.parentId) : ''}}
    </template>
    <template v-slot:[`item.sub`]="{ item }">
      <v-simple-checkbox
        :value="isMain(item.sub)"
        disabled
      ></v-simple-checkbox>
    </template>
    <template v-slot:[`item.subList`]="{ item }">
      <v-list>
        <v-list-item v-for="(subId, index) in item.sub" :key="index">
          <v-list-item-content>
            <v-list-item-subtitle>
              {{categoryName(subId)}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Category</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-progress-linear
              v-if="loader"
              indeterminate
              color="primary"
            ></v-progress-linear>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="8"
                    md="8"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.hsn"
                      label="HSN"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.image"
                      label="Image"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-select
                      v-model="editedItem.parentId"
                      :items="categories"
                      item-text="name"
                      item-value="id"
                      label="Main Category"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
                :disabled="loader"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    async mounted() {
      if(this.$store.getters.categories.length === 0) {
        await this.$store.dispatch('listCategories', {limit: 100})
      }
    },
    data: () => ({
      dialog: false,
      dialogGroup: false,
      dialogDelete: false,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Group', value: 'parentId' },
        { text: 'HSN', value: 'hsn' },
        { text: 'Image', value: 'image' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        hsn: '',
        image: '',
        parentId: '',
      },
      defaultItem: {
        name: '',
        hsn: '',
        image: '',
        parentId: '',
      }
    }),

    computed: {
      categories() {
        return this.$store.getters.categories
      },
      loader() {
        return this.$store.getters.loader
      },
      error() {
        return this.$store.getters.error
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {

      },
      categoryName(id) {
        return this.$store.getters.categoryName(id)
      },
      editItem (item) {
        this.editedIndex = this.categories.findIndex(c => c.id===item.id)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeGroupDialog () {
        this.dialogGroup = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          delete this.editedItem.createdAt
          delete this.editedItem.updatedAt
          await this.$store.dispatch('updateCategory', this.editedItem)
        } else {
          await this.$store.dispatch('createCategory', this.editedItem)
        }
        this.close()
      },
    },
  }
</script>