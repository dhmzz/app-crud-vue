<script setup>
    import { ElIcon, ElMessageBox, ElNotification } from 'element-plus'
    import { Goblet, Burger, Dessert } from '@element-plus/icons-vue'
    import {useMenuStore} from "@/stores/master/master-menu-store.js";

    const MenuStore = useMenuStore();

    defineProps({
        menu: Object,
    })

    const setTypeIcon = (type) => {
        if(type == 'food')
            return Burger;
        else if(type == 'beverage')
            return Goblet
        else 
            return Dessert
    }

    const deleteConfirmation = (key) => {
        ElMessageBox.confirm(
            'Data will permanently deleted. Continue?',
            'Warning',
            {
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel',
                confirmButtonClass: '!bg-[#AF2F33] !text-white',
                type: 'warning',
            }
        ).then(() => {
            const index = MenuStore.menuList.findIndex(item => item.description  == key);
            MenuStore.menuList.splice(index, 1);
            
            ElNotification({
                title: 'Success!',
                message: `Successfully deleted data.`,
                duration: 1500,
                type: 'success',
            })
        })
    }

    const handleEdit = (menu) => {
        MenuStore.dialog.isCreate = false;
        MenuStore.dialog.title = 'Edit menu data';
        // set index untuk update
        const index = MenuStore.menuList.findIndex(item => item.description  == menu.description);
        MenuStore.indexArr = index;

        MenuStore.menu = {...menu};
        MenuStore.dialog.visible = true;
    }
</script>

<template>
    <div class="bg-white shadow-lg hover:shadow-2xl hover:duration-1000 rounded-md flex justify-between items-center p-2 gap-3">
        <div class="w-17 h-17 bg-slate-400/40 rounded-md">
        </div>

        <div class="flex-1 h-full">
            <div class="font-bold text-xs">{{menu.name}}</div>
            <div class="text-xs md:!block text-slate-500">{{menu.description}}</div>
            <div class="text-xs text-slate-500 mt-2 flex items-center gap-2">
                <el-icon size="large" color='#E6AF5F'>
                    <component :is="setTypeIcon(menu.type)" />
                </el-icon>

                <span class="font-semibold text-slate-400">
                    ${{menu.price}}
                </span>
            </div>
        </div>

        <div class="flex justify-start gap-4 md:mr-3 sm:mr-0 felx-wrap">
            <h1 @click="handleEdit(menu)" class='text-blue-500 text-xs cursor-pointer hover:text-blue-900'>Edit</h1>
            <h1 @click="deleteConfirmation(menu.description)" class='text-blue-500 text-xs cursor-pointer hover:text-blue-900'>Delete</h1>
        </div>
    </div>

    <!-- <el-dialog
        v-model="MenuStore.dialog.visible"
        title="Tips"
        width="500"
        :before-close="handleClose"
        :show-close='false'	
    >
        <span>This is a message</span>
        <template #footer>
        <div class="dialog-footer">
            <el-button @click="MenuStore.dialog.visible = false">Cancel</el-button>
            <el-button type="primary" @click="handleSubmit()">
                Confirm
            </el-button>
        </div>
        </template>
    </el-dialog> -->
</template>