import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'пароль должен быть минимум 5 символов').isLength({min: 5})
]

export const registerValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('name', 'укажите никнейм').isLength({min: 3}),
    body('avatarUrl', 'неверная ссылка').optional().isURL(),
]

export const commentCreateValidation = [
    body('postId', 'пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('user', 'укажите никнейм').isObject(),
    body('text', 'введите текст коммента').isLength({min: 3}).isString()
]