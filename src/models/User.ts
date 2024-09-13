import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    BeforeCreate,
    PrimaryKey
} from 'sequelize-typescript'

@Table({
    timestamps: true,
    tableName: 'Users',
    modelName: 'User'
})
class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id!:string
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    username!: string
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string 
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string 

    @CreatedAt
    created_At!: Date;

    @UpdatedAt
    updated_at!: Date;
}

export default User 