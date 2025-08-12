import { describe, expect } from 'vitest'
import foodItems from './foodItems.json'
import OrderCalculator from "./OrderCalculator.js"


describe('OrderCalculator',()=>{
    it('should start 0 quantity of all items',()=>{
       const order = new OrderCalculator(foodItems.menu)
       expect(order.orderWithQuantity().every(item=> item.quantity === 0)).toBe(true)
    })

    it('should increase and decrease menu set correctly',()=>{
        const order = new OrderCalculator(foodItems.menu)

        order.increaseOrder(1)
        expect(order.order[1]).toBe(1)

        order.decreaseOrder(1)
        expect(order.order[1]).toBe(0)
    })

    it('should increase multiple menu set and decrease correctly',()=>{
        const order = new OrderCalculator(foodItems.menu)

        order.increaseOrder(1)
        order.increaseOrder(2)
        order.increaseOrder(1)
        order.increaseOrder(3)
        expect(order.order[1]).toBe(2)
        expect(order.order[3]).toBe(1)

        order.decreaseOrder(1)
        order.decreaseOrder(2)
        expect(order.order[1]).toBe(1)
        expect(order.order[2]).toBe(0)
    })

    it('should no discount if select no promotion set',()=>{
        const order = new OrderCalculator(foodItems.menu)

        order.increaseOrder(1)
        order.increaseOrder(1)
        order.increaseOrder(3)
        order.increaseOrder(3)

        expect(order.calDiscountPerSet()[1].discount).toBe(0)
        expect(order.calDiscountPerSet()[3].discount).toBe(0)
    })

    it('should give 5% discount for each bundle menu set (promotion set)',()=>{
        const order = new OrderCalculator(foodItems.menu)

        order.increaseOrder(2)
        order.increaseOrder(2)
        order.increaseOrder(5)
        order.increaseOrder(5)
        order.increaseOrder(5)

        expect(order.calDiscountPerSet().find(item=>item.id === 2).discount).toBe(4)
        expect(order.calDiscountPerSet().find(item=>item.id === 5).discount).toBe(8)
    })

    it('should discount 10% for total if use a member card',()=>{
        const order = new OrderCalculator(foodItems.menu)

        order.increaseOrder(1)
        order.increaseOrder(2)
        order.increaseOrder(3)
        order.increaseOrder(4)
        order.increaseOrder(5)
        order.member = true


        expect(order.calTotal()).toBe(250) // total before discount
        expect(order.calTotalDiscount()).toBe(25) // discount 10% of total
        expect(order.calTotal()-order.calTotalDiscount()).toBe(225) // total after discount
    })

    it('should discount 5% for bundle menu set (promotion set) and discount 10% for total if use a member card',()=>{
       
        const order = new OrderCalculator(foodItems.menu)
       
        order.increaseOrder(1)
        order.increaseOrder(2)
        order.increaseOrder(3)
        order.increaseOrder(4)
        order.increaseOrder(5)
        order.increaseOrder(5)
        order.increaseOrder(7)
        order.increaseOrder(7)
        order.increaseOrder(7)

        expect(order.calTotal()).toBe(690) // total before discount
        expect(order.calTotalDiscount()).toBe(20) // discount 5% for bundle and 10% if use member card
        expect(order.calTotal()-order.calTotalDiscount()).toBe(670) // total after discount
    })
})