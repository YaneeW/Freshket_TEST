export default class OrderCalculator{
    constructor(foodItems){
        this.member = false
        this.order = {}
        this.menu = foodItems
        this.discount = 0
    }

    getOrder(){
        return this.order
    }

    getQuantity(id){
        return this.order[id] || 0
    }

    checkMember(hasMember){
        return this.member = hasMember
    }

    orderWithQuantity(){
        return this.menu.map(item=>({
            ...item,
            quantity: this.getQuantity(item.id)
        }))
    }

    increaseOrder(id){
        this.order[id] = (this.order[id] || 0) + 1
    }

    decreaseOrder(id){
       this.order[id] = Math.max((this.order[id] || 0) - 1 ,0)
    }

    calDiscountPerSet(){
       return this.orderWithQuantity().map((item)=>{
            const totalPrice = item.price * item.quantity
            let discount = 0
            if(item.promotion === true){
                const quantityBundle = Math.floor(item.quantity/2)  // หารเอาจำนวนเต็ม ปัดเศษทิ้ง
                const discountPerBunble = (item.price * 2) * (5/100)
                discount = quantityBundle * discountPerBunble
            }
            return {
                ...item,
                totalPrice: totalPrice,
                discount: discount
            }
        })
    }

    calTotalDiscount(){
        const orderWithDiscount = this.calDiscountPerSet()

        const totalPrice = orderWithDiscount.reduce((total,item)=>{
            return total + item.totalPrice
        },0)

        let totalDiscount = orderWithDiscount.reduce((discount,item)=>{
            return discount + item.discount
        },0)

        if(this.member){
            const discountMember = totalPrice *(10/100)
            totalDiscount = totalDiscount + discountMember
        }
        return totalDiscount
    }

    calTotal(){
        const orderWithDiscount = this.calDiscountPerSet()
        return orderWithDiscount.reduce((total,item)=>{
            return total+ item.totalPrice
        },0)
    }


}