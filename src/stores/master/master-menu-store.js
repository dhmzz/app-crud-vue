import menuData from '../json/master.menu.json'
import { defineStore } from 'pinia';
import { ElNotification } from 'element-plus'

export const useMenuStore = defineStore('master-menu', {
    state: () => ({ 
        count: 0,
        name: 'Eduardo',
        menuList: menuData,
        pagination: {
            currentPage: 1,
            search: ''
        },
        dialog: {
            visible: false,
            title: '',
            isCreate: true,
            isLoadingSave: false
        },
        dialogDelete: {
            visible: false
        },
        menu: {
            name: '',
            price: 0,
            type: '',
            description: ''
        },
        indexArr: 0
    }),
    getters:{
        menuListFormatted(state) {
            const perPage = 5;
            const startIndex = (state.pagination.currentPage - 1) * perPage;
        
            let filteredMenu = state.menuList;
            if (state.pagination.search.trim() !== '') {
                filteredMenu = state.menuList.filter(menu => 
                    menu.name.toLowerCase().includes(state.pagination.search.toLowerCase()) ||
                    menu.type.toLowerCase().includes(state.pagination.search.toLowerCase()) ||
                    menu.description.toLowerCase().includes(state.pagination.search.toLowerCase())
                );
            }
        
            return state.pagination.search ? filteredMenu : filteredMenu.slice(startIndex, startIndex + perPage);
        },
        menuListTotal(state) {
            if (state.pagination.search.trim() === '') {
                return state.menuList.length;
            }
        
            return state.menuList.filter(menu => 
                menu.name.toLowerCase().includes(state.pagination.search.toLowerCase()) ||
                menu.type.toLowerCase().includes(state.pagination.search.toLowerCase()) ||
                menu.description.toLowerCase().includes(state.pagination.search.toLowerCase())
            ).length;
        }
        

    },
    actions: {
        increment() {
            this.count++
        },
        submitSaveMenu() {
            // Set isLoadingSave ke true sebelum loading
            this.dialog.isLoadingSave = true;
        
            this.fakeLoading()
                .then(() => {
                    if (this.dialog.isCreate) {
                        this.menuList.unshift({ ...this.menu });
                    } else {
                        const menuEdited = { ...this.menu}
                        this.menuList[this.indexArr].name = menuEdited.name;
                        this.menuList[this.indexArr].description = menuEdited.description;
                        this.menuList[this.indexArr].price = menuEdited.price;
                        this.menuList[this.indexArr].type = menuEdited.type;
                    }
                })
                .finally(() => {
                    this.dialog.visible = false;
                    this.resetForm();
                    this.dialog.isLoadingSave = false;
                    this.savedNotification()
                });
        },
        
        async fakeLoading() {
            return new Promise(resolve => setTimeout(resolve, 1000));
        },
        resetForm(){
            this.menu.name = '';
            this.menu.description = '';
            this.menu.price = 0;
            this.menu.type = '';
        },
        savedNotification(){
            ElNotification({
                title: 'Success!',
                message: `Successfully to ${this.dialog.isCreate ? 'saved' : 'updated'} data.`,
                duration: 1500,
                type: 'success',
            })
        }
    },
})